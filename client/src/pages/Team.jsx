import React from "react";
import "./Team.css";

function Team() {
  return (
    <div className="team-page">
      <h1>👥 فريق العمل</h1>

      {/* تعريف المركز */}
      <section className="intro-section">
        <h2>📖 تعريف مركز العلم والعمل</h2>
        <p>
          1) هو مركز تعليمي تدريبي استشاري دولي يعمل في مجلات البناء الإنساني
          والتزكية والتعليم والمعرفة، شعاره <strong>علم نافع عمل رافع</strong>.
        </p>
        <p>
          2) تستهدف أنشطة المركز كل فئات المجتمع، وخصوصا الآباء والأمهات،
          والمعلمين والمعلمات، مع تركيز أكبر على الأطفال وما يتعلق بهم.
        </p>
        <p>
          3) يركز المركز على البناء المنهاجي للإنسان وتسديد مفاهيمه وتجويد
          وترشيد مهاراته البنائية المنهاجية في التعامل مع مصادر المعرفة
          المسطورة والمنظورة.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="about-section">
        <h2>🎯 الرؤية</h2>
        <p>
          أن نكون مركزاً رائداً في نشر العلم والعمل، ونساهم في إعداد جيل قادر
          على الجمع بين المعرفة والتطبيق لخدمة المجتمع.
        </p>

        <h2>📌 الرسالة</h2>
        <p>
          توفير بيئة تدريبية متكاملة تجمع بين الجودة، القيم، والابتكار، عبر برامج
          تعليمية وتدريبية متميزة.
        </p>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <h2>🏆 إنجازاتنا</h2>
        <ul>
          <li>تأسس المركز سنة <strong>2012</strong></li>
          <li>
            تنظيم برامج تدريبية دولية بالشراكة مع <strong>مصر</strong> و
            <strong>السعودية</strong>
          </li>
          <li>تقديم التدريب <strong>أونلاين</strong> و<strong>حضوري</strong></li>
          <li>
            أكثر من <strong>120</strong> دورة تدريبية، و<strong>3500</strong>{" "}
            متدرب
          </li>
          <li>منح أكثر من <strong>2000</strong> شهادة معتمدة</li>
        </ul>
      </section>

      {/* Team structure */}
      <section className="team-structure">
        <h2>🧑‍💼 هيكل الفريق</h2>
        <div className="team-cards">
          <div className="team-card">
            <h3>المدير التنفيذي</h3>
            <p>إدارة عامة وتخطيط استراتيجي</p>
          </div>
          <div className="team-card">
            <h3>قسم التدريب</h3>
            <p>إعداد وتنفيذ البرامج التدريبية</p>
          </div>
          <div className="team-card">
            <h3>قسم التقنية</h3>
            <p>إدارة المنصة الإلكترونية والدورات عن بعد</p>
          </div>
          <div className="team-card">
            <h3>قسم العلاقات الدولية</h3>
            <p>التعاون مع الجامعات والمراكز في الخارج</p>
          </div>
          <div className="team-card">
            <h3>قسم الإعلام والتسويق</h3>
            <p>التواصل مع الجمهور ونشر الأنشطة</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
