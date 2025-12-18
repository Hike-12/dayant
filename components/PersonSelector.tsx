import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PersonSelectorProps {
  people: string[];
  selectedPerson: string;
  onSelect: (person: string) => void;
}

export function PersonSelector({ people, selectedPerson, onSelect }: PersonSelectorProps) {
  return (
    <div className="grid w-full max-w-xs items-center gap-2">
      <Label htmlFor="person-select" className="text-sm font-medium">Select Person</Label>
      <Select value={selectedPerson} onValueChange={onSelect}>
        <SelectTrigger id="person-select" className="h-11 rounded-lg border-0 bg-muted shadow-sm hover:shadow-md transition-shadow">
          <SelectValue placeholder="Choose a runner" />
        </SelectTrigger>
        <SelectContent 
          className="rounded-lg border-0 shadow-xl bg-popover" 
          position="popper" 
          sideOffset={8}
          align="start"
          side="bottom"
        >
          {people.map((person) => (
            <SelectItem 
              key={person} 
              value={person}
              className="rounded-md focus:bg-accent-brand/10 focus:text-accent-brand cursor-pointer"
            >
              {person}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
