import ListItem from "./ListItem";

export default function List() {
  const data = [
    {
      id: 1,
      title: "List Item Title",
      subtitle: "Subtitle",
    },
    {
      id: 2,
      title: "List Item Title",
      subtitle: "Subtitle",
    },
  ];

  const listItems = data.map((item) => <ListItem key={item.id} {...item} />);

  return <div className="list">{listItems}</div>;
}
