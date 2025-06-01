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
  DatePicker,
  Image,
  type SharedSelection
} from "@heroui/react";

import { useEffect, useState } from "react";
import { type DateValue } from "@internationalized/date";

import Filter from "../assets/filter.svg"
import type { GenresApiResponse, TagsApiResponse } from "../types/api";
import { fetchApi } from "../utils/fetchApi";

import { type Filters } from "../types/api";

export default function FilterDrawer({ filters, setFilters }: { filters: Filters, setFilters: (filters: Filters) => void }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  // Filter States
  const [priceFrom, setPriceFrom] = useState<number | undefined>(undefined);
  const [priceTo, setPriceTo] = useState<number | undefined>(undefined);
  const [dateMode, setDateMode] = useState("before");
  const [releaseDate, setReleaseDate] = useState<DateValue | null>(null);
  const [selectedTags, setSelectedTags] = useState<SharedSelection>(new Set());
  const [selectedGenres, setSelectedGenres] = useState<SharedSelection>(new Set());
  const [selectedPlatforms, setSelectedPlatforms] = useState<SharedSelection>(new Set());

  // Data States
  const [tags, setTags] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const platforms = [
    {key: "windows", label: "Windows"},
    {key: "macos", label: "MacOS"},
    {key: "linux", label: "Linux"},
  ];

  useEffect(() => {
    const fetchOptions = async () => {
      const {data: tagsResponse, error: error_tags} = await fetchApi<TagsApiResponse>('/games/tags')
      if (error_tags) {
        console.log(error_tags)
      } else {
        setTags(tagsResponse?.tags || [])
      }
      const {data: genresResponse, error: error_genres} = await fetchApi<GenresApiResponse>('/games/genres')
      if (error_genres) {
        console.log(error_genres)
      } else {
        setGenres(genresResponse?.genres || [])
      }
    }
    fetchOptions()
  }, [])

  // State Update Handlers
  const handlePriceFromChange = (value: number | undefined) => {
    setPriceFrom(value);
  };

  const handlePriceToChange = (value: number | undefined) => {
    setPriceTo(value);
  };

  const handleDateModeChange = (mode: string) => {
    setDateMode(mode);
  };

  const handleReleaseDateChange = (date: DateValue | null) => {
    setReleaseDate(date);
  };

  const handleTagsSelectionChange = (keys: SharedSelection) => {
    setSelectedTags(keys);
  };

  const handleGenresSelectionChange = (keys: SharedSelection) => {
    setSelectedGenres(keys);
  };

  const handlePlatformsSelectionChange = (keys: SharedSelection) => {
    setSelectedPlatforms(keys);
  };

  // Apply filter handler
  const handleApplyFilter = () => {
    // Convert DateValue to string format (YYYY-MM-DD)
    const releaseDateString = releaseDate 
      ? `${releaseDate.year.toString().padStart(4, '0')}-${releaseDate.month.toString().padStart(2, '0')}-${releaseDate.day.toString().padStart(2, '0')}`
      : ''

    // Convert SharedSelection to string arrays
    const tagsArray = selectedTags === "all" 
      ? tags 
      : Array.from(selectedTags as Set<string>)
    
    const genresArray = selectedGenres === "all" 
      ? genres.filter((genre) => genre.length > 2).map((genre) => genre.replace(',', ''))
      : Array.from(selectedGenres as Set<string>)
    
    const platformsArray = selectedPlatforms === "all" 
      ? platforms.map(p => p.key)
      : Array.from(selectedPlatforms as Set<string>)

    const newFilter: Filters = {
      ...filters, // Keep existing filter properties like limit
      min_price: priceFrom ? priceFrom * 100 : -1,
      max_price: priceTo ? priceTo * 100 : -1,
      release_date: releaseDateString,
      before: dateMode === "before",
      tags: tagsArray,
      genres: genresArray,
      platforms: platformsArray
    }

    setFilters(newFilter)
  }

  const handleClearFilter = () => {
    setPriceFrom(undefined)
    setPriceTo(undefined)
    setDateMode("before")
    setReleaseDate(null)
    setSelectedTags(new Set())
    setSelectedGenres(new Set())
    setSelectedPlatforms(new Set())

    setFilters({
      limit: 10,
      min_price: -1,
      max_price: -1,
      release_date: '',
      before: true,
      tags: [],
      genres: [],
      platforms: []
    })
  }

  return (
    <>
      <Button onPress={onOpen} radius="full" className="text-white" variant="light" size="sm">
        <Image src={Filter} height={25} radius="none" className="invert"/>
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
                    value={priceFrom}
                    onValueChange={handlePriceFromChange}
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
                    value={priceTo}
                    onValueChange={handlePriceToChange}
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
                    <Button 
                      isDisabled={dateMode === "before"} 
                      onPress={() => handleDateModeChange("before")}
                    >
                      Before
                    </Button>
                    <Button 
                      isDisabled={dateMode === "after"} 
                      onPress={() => handleDateModeChange("after")}
                    >
                      After
                    </Button>
                  </ButtonGroup>
                </div>
                <DatePicker
                  value={releaseDate}
                  onChange={handleReleaseDateChange}
                />
                <p>Tags</p>
                <Select
                  placeholder="Select tags"
                  selectionMode="multiple"
                  selectedKeys={selectedTags}
                  onSelectionChange={handleTagsSelectionChange}
                >
                  {tags.map((tag) => (
                    <SelectItem key={tag}>{tag}</SelectItem>
                  ))}
                </Select>
                <p>Genres</p>
                <Select
                  placeholder="Select genres"
                  selectionMode="multiple"
                  selectedKeys={selectedGenres}
                  onSelectionChange={handleGenresSelectionChange}
                >
                  {genres.filter((genre) => genre.length > 2).map((genre) => (
                    <SelectItem key={genre}>{genre.replace(',', '')}</SelectItem>
                  ))}
                </Select>
                <p>Platforms</p>
                <Select
                  placeholder="Select platforms"
                  selectionMode="multiple"
                  selectedKeys={selectedPlatforms}
                  onSelectionChange={handlePlatformsSelectionChange}
                >
                  {platforms.map((platform) => (
                    <SelectItem key={platform.key}>{platform.label}</SelectItem>
                  ))}
                </Select>
              </DrawerBody>
              <DrawerFooter>
                <Button color="default" onPress={() => {
                  handleClearFilter()
                  onClose()
                }}>
                  Clear
                </Button>
                <Button color="primary" onPress={() => {
                  handleApplyFilter()
                  onClose()
                }}>
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