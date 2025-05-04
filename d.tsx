"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Eye,
  FileText,
  RefreshCw,
  Ban,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITransaction } from '@/types';


export const columns: ColumnDef<ITransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionId") as string;
      return (
        <div
          className="font-mono text-xs max-w-[120px] truncate"
          title={transactionId}
        >
          {transactionId}
        </div>
      );
    },
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("userEmail") as string;
      return (
        <div className="font-medium max-w-[180px] truncate" title={email}>
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "ideaId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Idea ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ideaId = row.getValue("ideaId") as string;
      return (
        <div
          className="font-mono text-xs max-w-[120px] truncate"
          title={ideaId}
        >
          {ideaId}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const currency = row.original.gatewayResponse.currency;

      // Format the amount with the currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
        minimumFractionDigits: 2,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusColorMap: Record<string, string> = {
        Paid: "bg-green-100 text-green-800 hover:bg-green-100/80",
        Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
        Failed: "bg-red-100 text-red-800 hover:bg-red-100/80",
        Refunded: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
      };

      return (
        <Badge
          className={`${
            statusColorMap[status] || "bg-gray-100 text-gray-800"
          } font-medium`}
          variant="outline"
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "gatewayResponse.bank_gw",
    header: "Payment Method",
    cell: ({ row }) => {
      const paymentMethod = row.original.gatewayResponse.bank_gw;
      const cardType = row.original.gatewayResponse.card_type;

      return (
        <div
          className="max-w-[120px] truncate"
          title={`${paymentMethod} (${cardType})`}
        >
          {paymentMethod}
        </div>
      );
    },
  },
  {
    accessorKey: "gatewayResponse.card_brand",
    header: "Card Brand",
    cell: ({ row }) => {
      const cardBrand = row.original.gatewayResponse.card_brand;

      return (
        <div className="max-w-[120px] truncate" title={cardBrand}>
          {cardBrand}
        </div>
      );
    },
  },
  {
    accessorKey: "gatewayResponse.risk_title",
    header: "Risk Level",
    cell: ({ row }) => {
      const riskTitle = row.original.gatewayResponse.risk_title;
      const riskLevel = row.original.gatewayResponse.risk_level;

      const riskColorMap: Record<string, string> = {
        Safe: "bg-green-100 text-green-800",
        Low: "bg-blue-100 text-blue-800",
        Medium: "bg-yellow-100 text-yellow-800",
        High: "bg-red-100 text-red-800",
      };

      return (
        <Badge
          className={`${
            riskColorMap[riskTitle] || "bg-gray-100 text-gray-800"
          } font-medium`}
          variant="outline"
        >
          {riskTitle} ({riskLevel})
        </Badge>
      );
    },
  },
  {
    accessorKey: "gatewayResponse.discount_amount",
    header: "Discount",
    cell: ({ row }) => {
      const discountAmount = Number(
        row.original.gatewayResponse.discount_amount
      );
      const discountPercentage =
        row.original.gatewayResponse.discount_percentage;
      const currency = row.original.gatewayResponse.currency;

      if (discountAmount <= 0) return <div className="text-center">-</div>;

      // Format the discount amount with the currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
        minimumFractionDigits: 2,
      }).format(discountAmount);

      return (
        <div
          className="text-right"
          title={row.original.gatewayResponse.discount_remarks || ""}
        >
          {formatted} ({discountPercentage}%)
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "gatewayResponse.tran_date",
    header: "Gateway Date",
    cell: ({ row }) => {
      const tranDate = row.original.gatewayResponse.tran_date;
      return <div>{tranDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(transaction.transactionId)
                }
              >
                <span className="flex items-center">
                  <span className="mr-2">Copy Transaction ID</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View details</span>
                  </span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>
                <span className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Generate invoice</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download receipt</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {transaction.status === "Paid" && (
                <DropdownMenuItem>
                  <span className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span>Process refund</span>
                  </span>
                </DropdownMenuItem>
              )}
              {transaction.status === "Pending" && (
                <DropdownMenuItem className="text-red-600">
                  <span className="flex items-center">
                    <Ban className="mr-2 h-4 w-4" />
                    <span>Cancel transaction</span>
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Complete information about transaction{" "}
                {transaction.transactionId}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Transaction ID</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.transactionId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">User Email</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.userEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.amount}{" "}
                      {transaction.gatewayResponse.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge
                      variant={
                        transaction.status === "Paid"
                          ? "outline"
                          : transaction.status === "Pending"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        transaction.status === "Paid"
                          ? "bg-green-500"
                          : transaction.status === "Pending"
                          ? "bg-yellow-500"
                          : ""
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Idea ID</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.ideaId}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gateway Response</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Gateway Status</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.bank_gw}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Card Type</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.card_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Card Brand</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.card_brand}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Card Issuer</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.card_issuer}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transaction Date</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.tran_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Store Amount</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.store_amount}{" "}
                      {transaction.gatewayResponse.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Discount</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.discount_percentage}% (
                      {transaction.gatewayResponse.discount_amount}{" "}
                      {transaction.gatewayResponse.currency})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Risk Level</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.risk_title} (
                      {transaction.gatewayResponse.risk_level})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Issuer Country</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.gatewayResponse.card_issuer_country} (
                      {transaction.gatewayResponse.card_issuer_country_code})
                    </p>
                  </div>
                </CardContent>
              </Card>

              {transaction.gatewayResponse.discount_remarks && (
                <Card>
                  <CardHeader>
                    <CardTitle>Discount Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {transaction.gatewayResponse.discount_remarks}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

interface TransactionDataTableProps {
  data: ITransaction[];
}

export function TransactionDataTable({ data }: TransactionDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Status filter options
  const statusOptions = [
    { label: "Paid", value: "Paid" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
    { label: "Refunded", value: "Refunded" },
  ];

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter((prev) => {
      const newFilter = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      table
        .getColumn("status")
        ?.setFilterValue(newFilter.length ? newFilter : undefined);
      return newFilter;
    });
  };
  

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
        <Input
          placeholder="Filter by transaction ID..."
          value={
            (table.getColumn("transactionId")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("transactionId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Badge
              key={option.value}
              variant={
                statusFilter.includes(option.value) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => handleStatusFilterChange(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
