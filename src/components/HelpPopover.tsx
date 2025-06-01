import {Popover, PopoverTrigger, PopoverContent, Button} from "@heroui/react";

export default function App() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button radius="full" className="text-white text-3xl" variant="light" size="sm">?</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-steam-primary text-white">
        <div className="px-1 py-2">
          <div className="text-medium font-bold">How to use this app?</div>
          <ul className="list-disc list-inside">
            <li className="text-small">Swipe right to like a game</li>
            <li className="text-small">Swipe left to dislike a game</li>
            <li className="text-small">Keep swiping to get recommendations!</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
