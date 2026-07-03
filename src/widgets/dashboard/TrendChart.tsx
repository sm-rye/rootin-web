import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { Card, DashBoardHeading } from '@/shared/Components';
import { useDashboardTrend } from '@/entities/dashboard';
import type { TrendRange } from '@/entities/dashboard';

const RANGES: { label: string; value: TrendRange }[] = [
  { label: '7일', value: 7 },
  { label: '14일', value: 14 },
  { label: '30일', value: 30 },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="font-semibold text-primary">{payload[0].value}%</p>
    </div>
  );
}

export default function TrendChart() {
  const [range, setRange] = useState<TrendRange>(7);
  const { data, isLoading } = useDashboardTrend(range);

  const chartData =
    data?.trend.map((item) => ({
      date: dayjs(item.date).format('M/D'),
      rate: item.rate,
    })) ?? [];

  return (
    <Card className="p-5 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <DashBoardHeading mainText="달성률 추이" subText="일별 루틴 완료율" />
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {RANGES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setRange(value)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                range === value
                  ? 'bg-white text-primary shadow-sm font-semibold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="h-52 animate-pulse bg-gray-100 rounded-lg" />
      ) : (
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea4c89" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ea4c89" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#ea4c89"
                strokeWidth={2}
                fill="url(#trendGradient)"
                dot={{ r: 3, fill: '#ea4c89', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#ea4c89' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
