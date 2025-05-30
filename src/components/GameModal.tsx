import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Chip
} from "@heroui/react";

import ImageGallery from "react-image-gallery";

interface Props {
  isOpen: boolean,
  onOpenChange: () => void,
  name: string,
  desc: string,
  tags: string[]
}

export default function GameModal({isOpen, onOpenChange, name, desc, tags}: Props) {
  const screenshots = [
   {
      "thumbnail":"https:\/\/shared.akamai.steamstatic.com\/store_item_assets\/steam\/apps\/730\/ss_796601d9d67faf53486eeb26d0724347cea67ddc.600x338.jpg?t=1745368595",
      "original":"https:\/\/shared.akamai.steamstatic.com\/store_item_assets\/steam\/apps\/730\/ss_796601d9d67faf53486eeb26d0724347cea67ddc.1920x1080.jpg?t=1745368595"
   },
   {
      "id":1,
      "thumbnail":"https:\/\/shared.akamai.steamstatic.com\/store_item_assets\/steam\/apps\/730\/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.600x338.jpg?t=1745368595",
      "original":"https:\/\/shared.akamai.steamstatic.com\/store_item_assets\/steam\/apps\/730\/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.1920x1080.jpg?t=1745368595"
   },
   {
      "id":2,
      "thumbnail":"https:\/\/shared.akamai.steamstatic.com\/store_item_assets\/steam\/apps\/730\/ss_13bb35638c0267759276f511ee97064773b37a51.600x338.jpg?t=1745368595",
      "original":"https:\/\/shared.akamai.steamstatic.com\/store_item_assets\/steam\/apps\/730\/ss_13bb35638c0267759276f511ee97064773b37a51.1920x1080.jpg?t=1745368595"
   },
  ]
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-transparent text-white" backdrop="blur" shadow="none" size="full">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col text-3xl">{name}</ModalHeader>
              <ModalBody>
                {/* list of tags as chips */}
                <div className="flex-wrap w-full">
                  {
                    tags
                    .map((tag: string) => <Chip className="m-1">{tag}</Chip>)
                  }
                </div>
                <p>
                  {desc}
                </p>
                <ImageGallery items={screenshots} showFullscreenButton={false} showPlayButton={false} showNav={false}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
