export default function StatCard({ title, value, subtitle, icon: Icon, accent }) {
  return (
    <article className={`stat-card stat-${accent}`}>
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className="stat-icon">
          <Icon size={18} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
    </article>
  );
}