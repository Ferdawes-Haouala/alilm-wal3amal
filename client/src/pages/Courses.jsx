import React, { useEffect, useState } from "react";
import "./Courses.css";
import { API_BASE } from "../lib/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE}/trainings?populate=*`);
        const result = await response.json();
        setCourses(result.data || []);
      } catch (error) {
        console.error("❌ Failed to fetch courses:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const t = (course.Target || "").trim();
    const c = (course.Category || "").trim();
    if (selectedTarget && t !== selectedTarget) return false;
    if (selectedTarget === "للكبار" && selectedCategory !== "all")
      return c === selectedCategory;
    return true;
  });

  const handleTargetClick = (target) => {
    setSelectedTarget(target);
    setSelectedCategory("all");
  };

  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handleBack = () => {
    setSelectedTarget(null);
    setSelectedCategory("all");
  };

  return (
    <div className="courses-page">
      <h1 className="courses-title">دوراتنا</h1>

      {!selectedTarget && (
        <div className="course-filters">
          <div
            className="filter-image-container"
            onClick={() => handleTargetClick("للأطفال")}
          >
            <img src="/assets/courses/kids.svg" alt="دورات للأطفال" className="filter-image" />
            <p className="filter-label">دورات للأطفال</p>
          </div>

          <div
            className="filter-image-container"
            onClick={() => handleTargetClick("للشباب")}
          >
            <img src="/assets/courses/youth.svg" alt="دورات للشباب" className="filter-image" />
            <p className="filter-label">دورات للشباب</p>
          </div>

          <div
            className="filter-image-container"
            onClick={() => handleTargetClick("للكبار")}
          >
            <img src="/assets/courses/adults.svg" alt="دورات للكبار" className="filter-image" />
            <p className="filter-label">دورات للكبار</p>
          </div>
        </div>
      )}

      {selectedTarget && (
        <button className="back-button" onClick={handleBack}>
          ⬅️ العودة للفئات
        </button>
      )}

      {selectedTarget && (
        <div className="courses-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const attrs = course;
              const imageUrl = attrs.Image?.url
                ? `${import.meta.env.VITE_API_URL}${attrs.Image.url}`
                : null;

              let descriptionText = "لا يوجد وصف";
              if (Array.isArray(attrs.Description)) {
                descriptionText = attrs.Description.map((block) =>
                  block.children?.map((child) => child.text).join(" ")
                ).join("\n");
              } else if (typeof attrs.Description === "string") {
                descriptionText = attrs.Description;
              }

              return (
                <div key={course.id} className="course-row">
                  {/* Left: Description */}
                  <div className="course-text">
                    <h2 className="course-title">{attrs.Title || "بدون عنوان"}</h2>
                    <p className="course-description">{descriptionText}</p>
                    <p className="course-details">
                      <strong>📅</strong> {attrs.Date || "غير محدد"} |{" "}
                      <strong>📍</strong> {attrs.Location || "غير محدد"}
                    </p>
                    {attrs.Link && (
                      <a
                        href={attrs.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="course-button"
                      >
                        سجل من هنا
                      </a>
                    )}
                  </div>

                  {/* Right: Image */}
                  {imageUrl && (
                    <div className="course-image-container">
                      <img src={imageUrl} alt={attrs.Title} className="course-image" />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no-courses">⏳ لا توجد دورات في هذه الفئة حالياً</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Courses;
