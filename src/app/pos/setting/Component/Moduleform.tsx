import React from "react";
import { Formik, Form, Field } from "formik";


const ModuleForm = () => {
  const initialValues = {
    dashboard: {
      view: false,
      delete: false,
      edit: false,
      create: false,
    },
    parties: {
      view: false,
      delete: false,
      edit: false,
      create: false,
    },
    product: {
      view: false,
      delete: false,
      edit: false,
      create: false,
    },
    sales: {
      view: false,
      delete: false,
      edit: false,
      create: false,
    },
    purchase: {
      view: false,
      delete: false,
      edit: false,
      create: false,
    },
    // Add initial values for other modules similarly
  };

  const handleformSubmit = async (
    values: any,
    { setFieldError, setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    try {
      setSubmitting(true);

      const modulePermissions = Object.entries(values).map(
        ([moduleName, permissions]: [string, any]) => ({
          moduleName,
          view: Boolean(permissions.view),
          delete: Boolean(permissions.delete),
          edit: Boolean(permissions.edit),
          create: Boolean(permissions.create),
        })
      );

    //   await handleUpdateUserPermissions(userid, modulePermissions, firm?.id);

      resetForm();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Module Permissions</h1>
      <Formik initialValues={initialValues} onSubmit={handleformSubmit}>
        {({ handleSubmit }) => (
          <Form>
            <div className="overflow-x-auto border border-gray-300 rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Module
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      View
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delete
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Create
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Dashboard</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="dashboard.view" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="dashboard.delete" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="dashboard.edit" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="dashboard.create" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Parties</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="parties.view" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="parties.delete" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="parties.edit" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="parties.create" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Items</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="product.view" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="product.delete" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="product.edit" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="product.create" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Sale</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="sales.view" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="sales.delete" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="sales.edit" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="sales.create" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Purchase</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="purchase.view" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="purchase.delete" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="purchase.edit" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Field type="checkbox" name="purchase.create" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end px-10">
              <button
                type="submit"
                className="mt-4 bg-[#fda80c] text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModuleForm;