
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Table as TableIcon, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataDisplayProps {
  title?: string;
  images?: string[];
  data?: any[] | null;
  matrix?: any[][] | null;
}

const DataDisplay = ({ title, images, data, matrix }: DataDisplayProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    images && images.length > 0 ? "images" : data ? "data" : "matrix"
  );

  const handleDownload = () => {
    // Implementation would depend on what format to download in
    console.log("Download functionality would be implemented here");
    // Could download as CSV, XLSX, or images
  };

  // Helper to determine if we have data to show
  const hasContent = (images && images.length > 0) || data || matrix;
  
  if (!hasContent) {
    return null;
  }

  // Generate header columns for table data
  const getHeaders = () => {
    if (data && data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {title && (
        <div className="bg-muted/50 p-4 flex justify-between items-center border-b">
          <h3 className="font-medium">{title}</h3>
          {hasContent && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* Only show relevant tabs */}
        <TabsList className="grid w-full grid-cols-3 border-b rounded-none">
          {images && images.length > 0 && (
            <TabsTrigger value="images" className="flex items-center">
              <ImageIcon className="h-4 w-4 mr-2" /> Images
            </TabsTrigger>
          )}
          {data && (
            <TabsTrigger value="data" className="flex items-center">
              <TableIcon className="h-4 w-4 mr-2" /> Table
            </TabsTrigger>
          )}
          {matrix && (
            <TabsTrigger value="matrix" className="flex items-center">
              <TableIcon className="h-4 w-4 mr-2" /> Matrix
            </TabsTrigger>
          )}
        </TabsList>

        {/* Images display */}
        {images && images.length > 0 && (
          <TabsContent value="images" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((src, index) => (
                <div key={index} className="border rounded overflow-hidden">
                  <img
                    src={src}
                    alt={`Result image ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Table data display */}
        {data && (
          <TabsContent value="data" className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {getHeaders().map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {getHeaders().map((header, cellIndex) => (
                      <TableCell key={cellIndex}>{row[header]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        )}

        {/* Matrix display */}
        {matrix && (
          <TabsContent value="matrix" className="overflow-auto">
            <Table>
              <TableBody>
                {matrix.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="text-center">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default DataDisplay;
