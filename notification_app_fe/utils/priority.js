const weight = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export const getTopNotifications = (data, n = 10) => {
  if (!data || !Array.isArray(data)) return [];
  return [...data]
    .sort((a, b) => {
      if (weight[b.Type] !== weight[a.Type]) {
        return (weight[b.Type] || 0) - (weight[a.Type] || 0);
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
};
