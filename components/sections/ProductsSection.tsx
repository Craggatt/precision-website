import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../Button";
import Image from "next/image";

export function ProductCard() {
  return (
    <div className="p-200 bg-neutral-100 flex flex-col rounded-xl">
      <div className="bg-white w-[400px] h-[320px] rounded-lg overflow-hidden">
        <Image
          src={`/images/products/Halo-Maxi-4.png`}
          alt="product"
          width={400}
          height={320}
          className="object-contain"
        />
      </div>
      <div className="flex flex-row justify-between pt-200 items-center">
        <div className="flex flex-col">
          <p className="text-subheading">Halo Maxi</p>
          <p className="text-subheading text-[14px]! text-neutral-600 -mt-1">
            Double Sided
          </p>
        </div>
        <Button text="Find out More" size="sm" className="h-[40px]" />
      </div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <div className=" mx-auto bg-white py-[200px] flex flex-col gap-600 background-texture">
      <div className="flex flex-row justify-between items-center px-24 max-w-[2000px]">
        <h3 className="text-heading text-[40px]!">Our Product Range</h3>
        <Button text="See Full Range" />
      </div>
      <div className="flex flex-row items-center justify-between px-24 max-w-[2000px]">
        <div className="flex flex-row gap-400">
          <Button
            text="Overbank Signage"
            variation="secondary"
            className="bg-neutral-200"
          />
          <Button text="Entry Displays" variation="tertiary" />
          <Button text="Screens" variation="tertiary" />
          <Button text="Infills" variation="tertiary" />
        </div>
        <div className="flex flex-row gap-600">
          <Button
            text=""
            variation="secondary"
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          />
          <Button
            text=""
            variation="secondary"
            icon={<ChevronRight className="w-4 h-4 " />}
            iconPosition="left"
          />
        </div>
      </div>
      <div className="flex flex-row gap-600 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-24 -mt-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
