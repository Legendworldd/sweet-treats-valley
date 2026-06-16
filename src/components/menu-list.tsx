import { MENU } from "@/lib/menu";

export function MenuList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MENU.map((item) => (
        <div key={item.name} className="group relative overflow-hidden rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-primary/40">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">{item.emoji}</div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold">{item.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
              <p className="mt-1 text-sm font-semibold text-primary">{item.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
