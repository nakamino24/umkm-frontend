// src/components/organisms/DataTable/DataTable.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button, Loading } from '../../atoms';

export const DataTable = ({
  columns,
  data,
  loading = false,
  pagination,
  onPageChange,
  emptyMessage = 'Tidak ada data',
  rowKey = 'id'
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-1">
                    {column.title}
                    {column.sortable && sortConfig.key === column.key && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr 
                  key={row[rowKey] || index}
                  className="hover:bg-gray-50 transition"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Menampilkan {(pagination.current_page - 1) * pagination.per_page + 1} -{' '}
            {Math.min(pagination.current_page * pagination.per_page, pagination.total)} dari{' '}
            {pagination.total} data
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={pagination.current_page === 1}
              leftIcon={ChevronsLeft}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              leftIcon={ChevronLeft}
            />
            
            <span className="text-sm text-gray-700">
              Halaman {pagination.current_page} dari {pagination.last_page}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              leftIcon={ChevronRight}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(pagination.last_page)}
              disabled={pagination.current_page === pagination.last_page}
              leftIcon={ChevronsRight}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;