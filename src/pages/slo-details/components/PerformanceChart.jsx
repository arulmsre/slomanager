import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = ({ slo }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('performance');

  const timeRangeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartTypeOptions = [
    { value: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { value: 'errorBudget', label: 'Error Budget', icon: 'AlertCircle' },
    { value: 'violations', label: 'Violations', icon: 'XCircle' }
  ];

  // Mock performance data
  const performanceData = [
    { time: '00:00', performance: 99.95, errorBudget: 85, violations: 0 },
    { time: '04:00', performance: 99.92, errorBudget: 82, violations: 1 },
    { time: '08:00', performance: 99.88, errorBudget: 78, violations: 2 },
    { time: '12:00', performance: 99.85, errorBudget: 75, violations: 1 },
    { time: '16:00', performance: 99.91, errorBudget: 77, violations: 0 },
    { time: '20:00', performance: 99.94, errorBudget: 80, violations: 0 },
    { time: '24:00', performance: 99.96, errorBudget: 83, violations: 0 }
  ];

  const getChartColor = () => {
    switch (chartType) {
      case 'performance': return '#1E40AF';
      case 'errorBudget': return '#D97706';
      case 'violations': return '#DC2626';
      default: return '#1E40AF';
    }
  };

  const getYAxisDomain = () => {
    switch (chartType) {
      case 'performance': return [99.8, 100];
      case 'errorBudget': return [0, 100];
      case 'violations': return [0, 'dataMax + 1'];
      default: return ['auto', 'auto'];
    }
  };

  const formatTooltipValue = (value, name) => {
    if (name === 'performance') return [`${value}%`, 'Performance'];
    if (name === 'errorBudget') return [`${value}%`, 'Error Budget'];
    if (name === 'violations') return [value, 'Violations'];
    return [value, name];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Performance Trends</h2>
          <p className="text-sm text-muted-foreground">Historical data and threshold analysis</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={chartType === option?.value ? "default" : "ghost"}
                size="sm"
                iconName={option?.icon}
                iconPosition="left"
                onClick={() => setChartType(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeRangeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={timeRange === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(option?.value)}
                className="text-xs min-w-[60px]"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart Container */}
      <div className="h-80 w-full" aria-label={`${chartType} trend chart for ${timeRange}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={getYAxisDomain()}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelStyle={{ color: 'var(--color-foreground)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            
            {/* Target threshold line for performance chart */}
            {chartType === 'performance' && (
              <ReferenceLine 
                y={slo?.targetThreshold} 
                stroke="var(--color-error)" 
                strokeDasharray="5 5"
                label={{ value: `Target: ${slo?.targetThreshold}%`, position: 'right' }}
              />
            )}
            
            <Line 
              type="monotone" 
              dataKey={chartType} 
              stroke={getChartColor()}
              strokeWidth={2}
              dot={{ fill: getChartColor(), strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: getChartColor(), strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Average</div>
          <div className="text-lg font-semibold text-foreground">
            {chartType === 'violations' ? '0.7' : '99.91%'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Minimum</div>
          <div className="text-lg font-semibold text-foreground">
            {chartType === 'violations' ? '0' : '99.85%'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Maximum</div>
          <div className="text-lg font-semibold text-foreground">
            {chartType === 'violations' ? '2' : '99.96%'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Trend</div>
          <div className="flex items-center justify-center gap-1">
            <Icon 
              name={slo?.performanceTrend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={slo?.performanceTrend === 'up' ? 'text-success' : 'text-error'}
            />
            <span className={`text-sm font-medium ${slo?.performanceTrend === 'up' ? 'text-success' : 'text-error'}`}>
              {slo?.performanceTrend === 'up' ? 'Improving' : 'Declining'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;