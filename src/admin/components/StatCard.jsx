function StatCard({ label, value, detail, icon: Icon }) {
    return (
        <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-stone-500">{label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
                    {detail && <p className="mt-2 text-xs text-stone-500">{detail}</p>}
                </div>
                <span className="rounded-lg bg-amber-50 p-3 text-amber-700">
                    <Icon size={18} />
                </span>
            </div>
        </article>
    )
}

export default StatCard
