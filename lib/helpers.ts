export const static_times = [
  {
    time: "10:00:00",
    status: "pending",
  },
  {
    time: "11:00:00",
    status: "pending",
  },
  {
    time: "12:00:00",
    status: "pending",
  },
  {
    time: "13:00:00",
    status: "pending",
  },
  {
    time: "14:00:00",
    status: "pending",
  },
  {
    time: "15:00:00",
    status: "pending",
  },
  {
    time: "16:00:00",
    status: "pending",
  },
  {
    time: "17:00:00",
    status: "pending",
  },
  {
    time: "18:00:00",
    status: "pending",
  },
  {
    time: "19:00:00",
    status: "pending",
  },
];

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("sq-Al", { weekday: "long" });
  const month = date.toLocaleDateString("sq-Al", { month: "long" });
  const dayNum = date.getDate();
  return `${dayNum} ${month}, ${day}`;
};
