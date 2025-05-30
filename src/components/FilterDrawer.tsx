import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  ButtonGroup,
  useDisclosure,
  NumberInput,
  Select,
  SelectItem,
  DatePicker
} from "@heroui/react";

import { useState } from "react";

export default function FilterDrawer() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [dateMode, setDateMode] = useState("before")

  const animals = [
    {key: "cat", label: "Cat"},
    {key: "dog", label: "Dog"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
    {key: "tiger", label: "Tiger"},
    {key: "giraffe", label: "Giraffe"},
    {key: "dolphin", label: "Dolphin"},
    {key: "penguin", label: "Penguin"},
    {key: "zebra", label: "Zebra"},
    {key: "shark", label: "Shark"},
    {key: "whale", label: "Whale"},
    {key: "otter", label: "Otter"},
    {key: "crocodile", label: "Crocodile"},
  ];

  return (
    <>
      <Button onPress={onOpen} radius="full" className="text-white" variant="light" size="sm">
        <span className="material-symbols-outlined">filter_alt</span>
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="bg-transparent text-white">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Filter</DrawerHeader>
              <DrawerBody>
                <p>Price</p>
                <div className="flex items-center gap-2">
                  <NumberInput
                    label="From"
                    placeholder="0.00"
                    minValue={0}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                  <NumberInput
                    label="To"
                    placeholder="0.00"
                    minValue={0}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                <p>Release Date</p>
                <ButtonGroup size="sm" color="primary">
                  <Button isDisabled={dateMode == "before"} onPress={() => setDateMode("before")}>Before</Button>
                  <Button isDisabled={dateMode == "after"} onPress={() => setDateMode("after")}>After</Button>
                </ButtonGroup>
                </div>
                <DatePicker/>
                <p>Tags</p>
                <Select
                  placeholder="Select tags"
                  selectionMode="multiple"
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
                <p>Genres</p>
                <Select
                  placeholder="Select genres"
                  selectionMode="multiple"
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
                <p>Platforms</p>
                <Select
                  placeholder="Select platforms"
                  selectionMode="multiple"
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>
              </DrawerBody>
              <DrawerFooter>
                <Button color="primary" onPress={onClose}>
                  Apply
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
