"use client"

import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react"

export function AdminReportsView() {
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Month,Revenue\nJan,40000\nFeb,70000\nMar,45000\nApr,90000\nMay,65000\nJun,85000\nJul,120000\nAug,60000\nSep,80000\nOct,110000\nNov,95000\nDec,130000\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "revenue_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExportPDF = () => {
    const pdfContent = "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Revenue Report) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000219 00000 n \n0000000307 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n402\n%%EOF";
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'revenue_report.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-rose-500" />
            Reports & Analytics
          </h1>
          <p className="text-zinc-500 mt-2">Generate and download business performance reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-zinc-50 transition-colors">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button onClick={handleExportCSV} className="bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-zinc-50 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={handleExportPDF} className="bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-rose-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="text-zinc-500 text-sm font-bold mb-4">Total Revenue</h3>
          <p className="text-4xl font-bold text-zinc-900 mb-2">$84,290.00</p>
          <p className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12.5% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="text-zinc-500 text-sm font-bold mb-4">Active Customers</h3>
          <p className="text-4xl font-bold text-zinc-900 mb-2">1,240</p>
          <p className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +5.2% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="text-zinc-500 text-sm font-bold mb-4">Conversion Rate</h3>
          <p className="text-4xl font-bold text-zinc-900 mb-2">3.8%</p>
          <p className="text-rose-500 text-sm font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4 rotate-180" /> -0.4% from last month
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm h-[400px] flex items-center justify-center flex-col">
        <div className="w-full flex items-end justify-between gap-2 h-48 px-10 border-b border-zinc-100 pb-4">
          {[40, 70, 45, 90, 65, 85, 120, 60, 80, 110, 95, 130].map((h, i) => (
            <div key={i} className="w-12 bg-rose-100 rounded-t-md hover:bg-rose-500 transition-colors relative group" style={{ height: `${h}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                ${h}k
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between px-10 mt-4 text-xs font-bold text-zinc-400">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>
    </div>
  )
}
