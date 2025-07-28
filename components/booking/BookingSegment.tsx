import { IBookingSegment } from "@/types/IBookingSegment";

const BookingSegment = ({ segment }: { segment: IBookingSegment }) => {
  return (
    <div className="">
      {segment.arrival_city} - {segment.departure_city}
    </div>
  );
};

export default BookingSegment;
