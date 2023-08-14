import { ReactNode } from 'react'
import {type LayoutType} from '../../types'
import DefaultLayout from './Layouts/DefaultLayout'
import InvertedLayout from './Layouts/InvertedLayout'
import ColumnsLayout from './Layouts/ColumnsLayout'
import { useEditorStore } from '../../state/store'
import RowsLayout from './Layouts/RowsLayout'

const LAYOUT_TEMPLATES: Record<LayoutType, ReactNode> = {
  default: <DefaultLayout />,
  inverted: <InvertedLayout />,
  columns: <ColumnsLayout />,
  rows: <RowsLayout />,
}

const LayoutManager = () => {
  const layout = useEditorStore(state => state.layout)

  return LAYOUT_TEMPLATES[layout]
}

export default LayoutManager