import {Card, CardHeader, CardBody, Image, Button, Chip, Link, useDisclosure} from "@heroui/react";
import GameModal from "./GameModal";
import type { Game } from "../types/api";

import Windows from "../assets/windows.svg"
import Apple from "../assets/apple.svg"
import Linux from "../assets/linux.svg"
import ThumbsUp from "../assets/thumbs-up.svg"
import ThumbsDown from "../assets/thumbs-down.svg"
import NoVideo from "../assets/no-video.jpg"

interface Props {
  game: Game
}

export default function GameCard({game}: Props) {

  const appid: number = game.AppId
  const name: string = game.Name
  const tags: string[] = Object.keys(game.Tags)
  const price: number = game.Price
  const discount: number = game.Discount
  const initialPrice: number = game.InitialPrice
  const desc: string = game.ShortDesc
  const backgroundUrl: string = game.media.BackgroundURL
  const thumbnailUrl: string = game.media.ThumbnailURL
  const screenshots = game.media.Screenshots.map(({id, path_thumbnail: thumbnail, path_full: original}) => ({
    id,
    thumbnail,
    original
  }));
  const platforms = game.Platforms
  const positive = game.Positive
  const negative = game.Negative

  const platformIconMap: {[platform: string]: string} = {}
  platformIconMap["windows"] = Windows
  platformIconMap["mac"] = Apple
  platformIconMap["linux"] = Linux

  const displayTagsCount = 3

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };


  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <div 
      className="p-4 rounded-large w-fit"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Card className="py-4 w-[270px] border-none bg-black bg-opacity-30 text-white">
        <CardBody className="overflow-visible py-2">
          <Image
            className="object-cover rounded-xl"
            src={thumbnailUrl}
            width={270}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{name}</h4>
          <div className="flex justify-between items-center w-full py-1">
            <Chip size="sm" variant="bordered">
              <div className="flex">
                {platforms.map((platform: string) => <Image src={platformIconMap[platform]} height={15} radius="none" className="mx-1 invert" key={platform}/>)}
              </div>
            </Chip>
            <div className="flex gap-2">
              <Chip size="sm" color="success" className="text-white" startContent={<Image src={ThumbsUp} height={15} radius="none" className="invert mx-1"/>}>{formatNumber(positive)}</Chip>
              <Chip size="sm" color="danger" className="text-white" startContent={<Image src={ThumbsDown} height={15} radius="none" className="invert mx-1"/>}>{formatNumber(negative)}</Chip>
            </div>
          </div>
          <div className="flex-wrap w-full py-1">
            {
              tags.slice(0, displayTagsCount)
              .map((tag: string) => <Chip size="sm" className="m-1" key={tag}>{tag}</Chip>)
              .concat(tags.length > displayTagsCount ? [<Chip size="sm" className="m-1" onTouchEnd={onOpen} key="extras">+{tags.length - displayTagsCount}</Chip>] : [])
            }
          </div>
          <div className="flex justify-between items-center w-full py-1">
              <small className="text-white pl-1">{price === 0 ? "Free" : `$ ${price / 100}`}</small>
              {discount > 0 && <small className="text-default-500 pl-1 line-through">{`$ ${initialPrice / 100}`}</small>}
              <Button
              color="primary"
              size="sm"
              radius="full"
              as={Link}
              href={`https://store.steampowered.com/app/${appid}`}
              target="_blank"
              showAnchorIcon
              >
                Store Page
              </Button>
          </div>
        </CardHeader>
        <CardBody>
          {game.media.Movies.length > 0 ? 
            <video
              width="100%"
              controls
              poster={game.media.Movies[0].thumbnail}
              className="rounded-lg"
              src={game.media.Movies[0].mp4[480]}
            /> :
            <Image src={NoVideo} className="invert"/>
          }
        </CardBody>
        <Button variant='ghost' radius='lg' color='primary' onPress={onOpen} className="mx-auto">More Details</Button>
        <GameModal isOpen={isOpen} onOpenChange={onOpenChange} name={name} desc={desc} tags={tags} screenshots={screenshots}/>
      </Card>
    </div>
  );
}

