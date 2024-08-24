import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type User, fakeData, usStates } from "./makedata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Example = () => {
  // const averageSalary = useMemo(
  //   () => fakeData.reduce((acc, curr) => acc + curr.amount, 0) / fakeData.length,
  //   [],
  // );
  const taxRate = 0.1; // Define your tax rate here (e.g., 10%)

  const theme = useTheme();

  const totalAmount = useMemo(
    () => fakeData.reduce((acc, curr) => acc + parseFloat(curr.amount), 0),
    []
  );
  const totalTax = useMemo(() => totalAmount * taxRate, [totalAmount, taxRate]);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, User>>({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "#",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "ProductName",
        header: "Product Name",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ cell, row }) => ({
          select: true,
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Required"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Required"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "unit",
        header: "Unit",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateEmail(event.currentTarget.value)
              ? "Incorrect Email Format"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "Price/Unit",
        header: "Price/Unit",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
      {
        accessorKey: "Discount",
        header: "Discount",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
      {
        accessorKey: "Tax",
        header: "Tax",
        editVariant: "select",
        columns: [
          {
            accessorKey: "taxPercent",
            header: "%",
            cell: (info) => `${taxRate * 100}%`,
            footer: "Tax Rate",
          },
          {
            accessorKey: "taxAmount",
            header: "Amount",
            cell: (info) =>
              totalTax.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }),
            footer: "Total Tax",
          },
        ],
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        editVariant: "text",
        aggregationFn: "sum",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
        Footer: () => (
          <Stack>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total Amount:</Typography>
              <Typography color="warning.main">
                {totalAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Tax (10%):</Typography>
              <Typography color="warning.main">
                {totalTax.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </Box>
          </Stack>
        ),
      },
    ],
    [editedUsers, validationErrors, totalAmount]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUsers, isPending: isUpdatingUsers } =
    useUpdateUsers();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUsers = async () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    await updateUsers(Object.values(editedUsers));
    setEditedUsers({});
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    getRowId: (row) => row.id,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "cell", // ('modal', 'row', 'table', and 'custom' are also available)
    enableCellActions: true,
    enableClickToCopy: "context-menu",
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: true,
    enablePagination: false,
    
    // enableTopToolbar: false,
    enableBottomToolbar: false,
    // components: {
    //   TopToolbar: () => null // Hide the entire top toolbar
    // },
    // muiTopToolbarProps: { showFilterButton: false },
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "auto",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: theme.shadows[1],
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor: row.index % 2 ? "#f2f2f2" : undefined,
        "& > .MuiTableCell-root": {
          borderRight: "1px solid #ccc", // Add border between cells
        },
      },
    }),
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#FFF1EC",
        color: "#1F1F1F",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    // initialState: {
    //   columnPinning: {
    //     right: ["mrt-row-actions"],
    //   },
    // },
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUsers || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
    // Uncomment and use if needed
    // renderBottomToolbarCustomActions: () => (
    //   <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    //     <Button
    //       color="success"
    //       variant="contained"
    //       onClick={handleSaveUsers}
    //       disabled={
    //         Object.keys(editedUsers).length === 0 ||
    //         Object.values(validationErrors).some((error) => !!error)
    //       }
    //     >
    //       {isUpdatingUsers ? <CircularProgress size={25} /> : 'Save'}
    //     </Button>
    //     {Object.values(validationErrors).some((error) => !!error) && (
    //       <Typography color="error">Fix errors before submitting</Typography>
    //     )}
    //   </Box>
    // ),
  });

  return (
    <>
      <style>
        {`
          /* Hide filter button */
          .material-react-table .MuiIconButton-root[aria-label="Filter list"] {
            display: none;
          }
        `}
      </style>
      <MaterialReactTable table={table} />
      <div className="mt-3">
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true); // Opens the create row modal with no default values
          }}
        >
          Add Product
        </Button>
      </div>
    </>
  );
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as User[]
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (users: User[]) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUsers: User[]) => {
      queryClient.setQueryData(["users"], (prevUsers: any) =>
        prevUsers?.map((user: User) => {
          const newUser = newUsers.find((u) => u.id === user.id);
          return newUser ? newUser : user;
        })
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(["users"], (prevUsers: any) =>
        prevUsers?.filter((user: User) => user.id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: User) {
  return {
    firstName: !validateRequired(user.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
