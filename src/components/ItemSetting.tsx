import { ReactNode } from "react"

interface Props {
    children: ReactNode;
    id: string;
    label: string;
    title: string;
    subtitle: string;
}

const ItemSetting: React.FC<Props> = ({ id, label, title, subtitle, children}) => {
  return (
    <section className="item-settings">
        <strong>
          <span className="item-setting--label">{label} </span>
          {title}
        </strong>
        {subtitle}
        <div>
          <label htmlFor={id} />
          {children}
        </div>
      </section>
  )
}

export default ItemSetting