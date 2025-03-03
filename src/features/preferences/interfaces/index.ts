import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'

export type UserSelectionHandler = (user: SchemaUserPreviewResponseDto) => void
