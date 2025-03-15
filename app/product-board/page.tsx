import { defaultMetadata } from "../config"
import type { Metadata } from "next"
import ProductBoardClient from "./ProductBoardClient"

export const metadata: Metadata = {
  title: "Product Board | " + defaultMetadata.title,
  description: "View and submit product ideas for Supercivilization.",
}

// Next.js 15 requires explicit dynamic setting
export const dynamic = "force-dynamic"

// Next.js 15 requires explicit revalidate setting
export const revalidate = 0

function ProductBoardPage() {
  return <ProductBoardClient />
}

export default ProductBoardPage

