'use client';

interface UdotCautionBannerProps {
  isPowderAlertActive: boolean;
}

export default function UdotCautionBanner({ isPowderAlertActive }: UdotCautionBannerProps) {
  // Only show banner if powder alert is active
  if (!isPowderAlertActive) return null;

  const handleClick = () => {
    window.open('https://cottonwoodcanyons.udot.utah.gov/', '_blank');
  };

  return (
    <div className="flex justify-center py-4">
      <button
        onClick={handleClick}
        className="relative z-10 bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3 text-center cursor-pointer hover:bg-yellow-100 transition-all shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <p className="text-yellow-800 font-medium">
            Snow expected today! Check UDOT for current road conditions and restrictions.{' '}
            <span className="underline underline-offset-2">Click here</span>
          </p>
        </div>
      </button>
    </div>
  );
} 