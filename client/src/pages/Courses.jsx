import React, { useEffect, useState } from "react";
import "./Courses.css";
import { API_BASE } from "../lib/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null); // First level: Target
  const [selectedCategory, setSelectedCategory] = useState("all"); // Second level: Category

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("🔄 Fetching courses from API...");
        const response = await fetch(`${API_BASE}/trainings?populate=*`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        console.log("📚 Full Courses API Response:", result);
        
        if (result.data && Array.isArray(result.data)) {
          // Log each course for debugging
          result.data.forEach((course, index) => {
            console.log(`📖 Course ${index + 1}:`, {
              title: course.Title,
              target: course.Target,
              category: course.Category,
              allKeys: Object.keys(course)
            });
          });
          setCourses(result.data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Two-level filtering with exact Strapi field values
  const filteredCourses = courses.filter((course) => {
    const courseTarget = (course.Target || "").trim();
    const courseCategory = (course.Category || "").trim();
    
    console.log(`🔍 Filtering course: "${course.Title}"`);
    console.log(`   Target: "${courseTarget}" vs Selected: "${selectedTarget}"`);
    console.log(`   Category: "${courseCategory}" vs Selected: "${selectedCategory}"`);
    
    // First level: Filter by Target if selected
    if (selectedTarget && courseTarget !== selectedTarget) {
      console.log(`   ❌ Target mismatch`);
      return false;
    }
    
    // Second level: Filter by Category if selected (only when target is للكبار)
    if (selectedTarget === "للكبار" && selectedCategory !== "all") {
      const match = courseCategory === selectedCategory;
      console.log(`   ${match ? '✅' : '❌'} Category ${match ? 'match' : 'mismatch'}`);
      return match;
    }
    
    console.log(`   ✅ Passed filter`);
    return true;
  });

  console.log("📊 Filter State:", {
    selectedTarget,
    selectedCategory,
    totalCourses: courses.length,
    filteredCourses: filteredCourses.length
  });

  const handleTargetClick = (target) => {
    console.log(`🎯 Target clicked: "${target}"`);
    setSelectedTarget(target);
    setSelectedCategory("all"); // Reset category when changing target
  };

  const handleCategoryClick = (category) => {
    console.log(`📁 Category clicked: "${category}"`);
    setSelectedCategory(category);
  };

  const handleBackToTargets = () => {
    console.log("⬅️ Back to targets");
    setSelectedTarget(null);
    setSelectedCategory("all");
  };

  return (
    <div className="courses-page">
      <h1 className="courses-title">دوراتنا</h1>

      {/* Level 1: Target Selection (Kids/Youth/Elderly) */}
      {!selectedTarget && (
        <div className="target-filters">
          <h2 className="filter-section-title">اختر الفئة المستهدفة</h2>
          <div className="course-filters">
            {/* Kids */}
            <div
              className="filter-image-container"
              onClick={() => handleTargetClick("للأطفال")}
            >
              <img
                src="/assets/courses/kids.svg"
                alt="دورات للأطفال"
                className="filter-image"
              />
              <p className="filter-label">دورات للأطفال</p>
            </div>

            {/* Youth */}
            <div
              className="filter-image-container"
              onClick={() => handleTargetClick("للشباب")}
            >
              <img
                src="/assets/courses/youth.svg"
                alt="دورات للشباب"
                className="filter-image"
              />
              <p className="filter-label">دورات للشباب</p>
            </div>

            {/* Elderly/Adults */}
            <div
              className="filter-image-container"
              onClick={() => handleTargetClick("للكبار")}
            >
              <img
                src="/assets/courses/adults.svg"
                alt="دورات للكبار"
                className="filter-image"
              />
              <p className="filter-label">دورات للكبار</p>
            </div>
          </div>
        </div>
      )}

      {/* Level 2: Category Selection (Only for Elderly) */}
      {selectedTarget === "للكبار" && (
        <div className="category-filters">
          <button onClick={handleBackToTargets} className="back-button">
            ⬅️ العودة للفئات
          </button>
          
          <h2 className="filter-section-title">اختر نوع الدورة</h2>
          <div className="course-filters">
            {/* جماهيرية */}
            <div
              className={`filter-image-container ${
                selectedCategory === "دورات جماهيرية" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("دورات جماهيرية")}
            >
              <img
                src="/assets/courses/public.svg"
                alt="دورات جماهيرية"
                className="filter-image"
              />
              <p className="filter-label">دورات جماهيرية</p>
            </div>

            {/* بنائية */}
            <div
              className={`filter-image-container ${
                selectedCategory === "دورات بنائية" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("دورات بنائية")}
            >
              <img
                src="/assets/courses/build.svg"
                alt="دورات بنائية"
                className="filter-image"
              />
              <p className="filter-label">دورات بنائية</p>
            </div>
          </div>

          {/* "All Courses" button for elderly */}
          <div className="all-courses-container">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`filter-button ${selectedCategory === "all" ? "active" : ""}`}
            >
              جميع دورات الكبار
            </button>
          </div>
        </div>
      )}

      {/* For Kids and Youth: Show courses directly with back button */}
      {selectedTarget && selectedTarget !== "للكبار" && (
        <div className="simple-target-view">
          <button onClick={handleBackToTargets} className="back-button">
            ⬅️ العودة للفئات
          </button>
          <h2 className="filter-section-title">
            {selectedTarget === "للأطفال" && "دورات للأطفال"}
            {selectedTarget === "للشباب" && "دورات للشباب"}
          </h2>
        </div>
      )}

      {/* Debug Info (Remove after testing) */}
      <div style={{
        background: '#f3f4f6',
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>🔍 Debug Info:</strong>
        <div>Selected Target: {selectedTarget || "None"}</div>
        <div>Selected Category: {selectedCategory}</div>
        <div>Total Courses: {courses.length}</div>
        <div>Filtered Courses: {filteredCourses.length}</div>
      </div>

      {/* ✅ Courses Grid */}
      {selectedTarget && (
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const attrs = course;
              const imageUrl = attrs.Image?.url
                ? `${import.meta.env.VITE_API_URL}${attrs.Image.url}`
                : null;

              let descriptionText = "لا يوجد وصف";
              if (Array.isArray(attrs.Description)) {
                descriptionText = attrs.Description
                  .map((block) =>
                    block.children?.map((child) => child.text).join(" ")
                  )
                  .join("\n");
              } else if (typeof attrs.Description === "string") {
                descriptionText = attrs.Description;
              }

              return (
                <div key={course.id} className="courses-card">
                  {imageUrl && <img src={imageUrl} alt={attrs.Title || "Course"} />}
                  <div className="courses-card-content">
                    <h2 className="courses-card-title">{attrs.Title || "بدون عنوان"}</h2>
                    <p className="courses-card-description">{descriptionText}</p>

                    <div className="courses-card-details">
                      <p><strong>📅</strong> {attrs.Date || "غير محدد"}</p>
                      <p><strong>📍</strong> {attrs.Location || "غير محدد"}</p>
                    </div>

                    {attrs.Target && (
                      <p className="courses-card-target">الفئة: {attrs.Target}</p>
                    )}

                    {attrs.Category && (
                      <p className="courses-card-category">{attrs.Category}</p>
                    )}

                    {attrs.Link && (
                      <a
                        href={attrs.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="courses-card-button"
                      >
                        التسجيل الآن
                      </a>
                    )}
                  </div>
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