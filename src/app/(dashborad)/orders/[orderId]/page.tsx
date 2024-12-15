import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`);
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8 md:p-12">
      {/* Card Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
          <h1 className="text-2xl font-bold tracking-wide drop-shadow-lg">
            Order Details
          </h1>
          <p className="mt-2 text-sm font-medium">
            Order ID:{" "}
            <span className="text-gray-200 drop-shadow-md">
              {orderDetails._id}
            </span>
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Customer and Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-semibold">Customer Details</p>
              <p className="mt-2 text-gray-700">
                <span className="font-medium">Name:</span> {customer.name}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Order Summary</p>
              <p className="mt-2 text-gray-700">
                <span className="font-medium">Total Paid:</span> $
                {orderDetails.totalAmount}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Shipping Rate:</span>{" "}
                {orderDetails.shippingRate}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <p className="text-lg font-semibold">Shipping Address</p>
            <p className="mt-2 text-gray-700">
              {street}, {city}, {state}, {postalCode}, {country}
            </p>
          </div>

          {/* Products Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <DataTable
              columns={columns}
              data={orderDetails.products}
              searchKey="product"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
