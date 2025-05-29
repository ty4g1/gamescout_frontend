import {Card, CardHeader, CardBody, Image, Button, Chip, Link, useDisclosure} from "@heroui/react";
import GameModal from "./GameModal";

export default function GameCard() {

  const name: string = "Counter Strike 2"
  const tags: string[] = ["FPS", "Multiplayer", "Action", "Strategy", "Online"]
  const price: string = "Free"
  const desc: string = "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2."

  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <div 
      className="p-4 rounded-large w-fit"
      style={{
        backgroundImage: `url(https://store.akamai.steamstatic.com//images//storepagebackground//app//730?t=1745368595)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Card className="py-4 w-[270px] border-none bg-black/50 text-white" isBlurred>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
          //   needs to be a prop
            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595"
            width={270}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          {/* name prop */}
          <h4 className="font-bold text-large">{name}</h4>
          {/* list of tags as chips */}
          <div className="flex-wrap w-full py-1">
            {
              tags.slice(0, 3)
              .map((tag: string) => <Chip size="sm" className="m-1">{tag}</Chip>)
              .concat(tags.length > 3 ? [<Chip size="sm" className="m-1" onTouchEnd={onOpen}>+{tags.length - 3}</Chip>] : [])
            }
          </div>
          <div className="flex justify-between items-center w-full py-1">
              {/* price prop */}
              <small className="text-default-500 pl-1">{price}</small>
              <Button
              color="primary"
              size="sm"
              radius="full"
              as={Link}
              href="https://store.steampowered.com/app/730"
              target="_blank"
              showAnchorIcon
              >
                Store Page
              </Button>
          </div>
        </CardHeader>
        <CardBody>
          <video
            width="100%"
            controls
            poster="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256972298/movie.293x165.jpg?t=1696005467"
            className="rounded-lg"
            src="http://video.akamai.steamstatic.com/store_trailers/256972298/movie480.mp4?t=1696005467"
          />
        </CardBody>
        <Button variant='ghost' radius='lg' color='primary' onPress={onOpen} className="mx-auto">More Details</Button>
        <GameModal isOpen={isOpen} onOpenChange={onOpenChange} name={name} desc={desc} tags={tags}/>
      </Card>
    </div>
  );
}

