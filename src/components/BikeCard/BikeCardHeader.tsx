interface BikeCardHeaderProps {
  title: string;
}

export function BikeCardHeader({ title }: BikeCardHeaderProps) {
  return (
    <div className="flex justify-between items-start p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h3 className="m-0 text-xl font-semibold flex-1 leading-tight">{title || 'Untitled Case'}</h3>
      <span className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider ml-4 whitespace-nowrap bg-white/25 text-white border border-white/30">
        STOLEN
      </span>
    </div>
  );
}

