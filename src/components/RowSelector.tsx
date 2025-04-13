
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface RowSelectorProps {
  data: any[];
  onRowSelect: (row: any) => void;
}

const RowSelector = ({ data, onRowSelect }: RowSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<string>("");
  const { toast } = useToast();

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4 border rounded bg-muted/30">
        No data available for selection
      </div>
    );
  }

  // Determine a good display value for each row
  const getRowLabel = (row: any, index: number) => {
    // Try to use a name or title field if available
    const nameField = Object.keys(row).find(
      (key) => key.toLowerCase().includes("name") || key.toLowerCase().includes("title")
    );
    
    return nameField ? `${row[nameField]} (Row ${index + 1})` : `Row ${index + 1}`;
  };

  const handleSelectChange = (value: string) => {
    setSelectedIndex(value);
    const index = parseInt(value);
    
    if (!isNaN(index) && index >= 0 && index < data.length) {
      onRowSelect(data[index]);
      toast({
        title: "Row selected",
        description: `Processing row ${index + 1}`,
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Select value={selectedIndex} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a row to process" />
          </SelectTrigger>
          <SelectContent>
            {data.map((row, index) => (
              <SelectItem key={index} value={index.toString()}>
                {getRowLabel(row, index)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedIndex !== "" && (
          <div className="mt-4 p-4 border rounded bg-muted/30 max-h-[200px] overflow-auto">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(data[parseInt(selectedIndex)], null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RowSelector;
