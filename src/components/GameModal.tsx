import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Chip
} from "@heroui/react";

import ImageGallery from "react-image-gallery";

interface SlideshowImage {
  id: number
  thumbnail: string
  original: string
}

interface Props {
  isOpen: boolean,
  onOpenChange: () => void,
  name: string,
  desc: string,
  tags: string[],
  screenshots: SlideshowImage[]
}

export default function GameModal({isOpen, onOpenChange, name, desc, tags, screenshots}: Props) {
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-transparent text-white" backdrop="blur" shadow="none" size="full" scrollBehavior="inside">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col text-3xl">{name}</ModalHeader>
              <ModalBody>
                <div className="flex-wrap w-full">
                  {
                    tags
                    .map((tag: string) => <Chip className="m-1" key={tag}>{tag}</Chip>)
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
