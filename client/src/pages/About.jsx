import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-section">
        <h1 className="section-title">من نحن ؟ </h1>

        {/* تعريف المركز */}
        <section className="intro-section">
          <div className="text-block">
          <h2 className="bordered-heading">تعريف مركز العلم والعمل</h2>
          <p>
            هو مركز تعليمي تدريبي استشاري دولي يعمل في مجالات البناء الإنساني
            والتزكية والتعليم والمعرفة، شعاره <strong>علم نافع عمل رافع</strong>.
          </p>
          <p>
            تستهدف أنشطة المركز كل فئات المجتمع، وخصوصا الآباء والأمهات،
            والمعلمين والمعلمات، مع تركيز أكبر على الأطفال وما يتعلق بهم.
          </p>
          <p>
            يركز المركز على البناء المنهاجي للإنسان وتسديد مفاهيمه وتجويد
            وترشيد مهاراته البنائية المنهاجية في التعامل مع مصادر المعرفة
            المسطورة والمنظورة.
          </p>
          </div>
        </section>
      </div>

      {/* Additional Sections */}
      <section className="about-section">
        <div className="text-block">
          <h2 className="bordered-heading">  من أهدافنا </h2>
          <p>
            بناء الإنسان وتنمية مهاراته المنهجية.<br />
            تنمية وتطوير مهارات الأطفال وقدراتهم.<br />
            تدريب المعلمين والمدربين وأولياء الأمور.<br />
            تصميم ودراسة وتنفيذ البرامج التعليمية والتدريبية والتدريسية والمساعدة فيها.<br />
            الإرشاد والمساعدة في التدريب والتعليم.<br />
            تنظيم الفعاليات العلمية والندوات والمؤتمرات.
          </p>
        </div>

        <div className="text-block">
          <h2 className="bordered-heading">إصداراتنا</h2>
          <p>
            يتميز المركز بإنتاج ونشر العديد من البرامج والمناهج والمواد التعليمية والتدريبية المكتوبة
            والمسموعة والمرئية المتخصصة والحصرية.<br />
            <a href="/books" className="link">اضغط هنا للتعرف أكثر على إصداراتنا</a>
          </p>
        </div>

        <div className="text-block">
          <h2 className="bordered-heading">دوراتنا</h2>
          <p>
            يقدم المركز باقة متنوعة من الدورات سواء كانت حضورية أو عن بعد لمختلف الفئات العمرية.<br />
            <a href="/courses" className="link">اضغط هنا للتعرف أكثر على دوراتنا</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
