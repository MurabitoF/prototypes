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
        <label htmlFor={id}>
          <strong>
            <span className="item-setting--label">{label} </span>
            {title}
          </strong>
        </label>
        <span className="item-setting--subtitle">{subtitle}</span>
        <div>{children}</div>
      </section>
  )
}

export default ItemSetting