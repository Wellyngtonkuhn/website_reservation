export default function TripDetail({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
