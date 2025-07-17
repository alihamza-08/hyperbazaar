import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import styled from "styled-components";
import CategoryForm from "../../../Form/CategoryForm";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/vi/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        alert("created successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/vi/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/vi/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (e) => {
    try {
      const id = selected._id;
      const { data } = await axios.delete(
        `http://localhost:3000/api/vi/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        alert("deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
        alert("error occurred");
      }
    } catch (error) {
      toast.error("Something went wrong");
      alert("internal server error");
    }
  };

  return (
    <MainContainer>
      <Header>Category Management</Header>
      <CategoryFormContainer>
        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
      </CategoryFormContainer>
      <TableContainer>
        <Table className="table">
          <thead>
            <tr>
              <TableHeader scope="col">Name</TableHeader>
              <TableHeader scope="col">Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <TableRow key={c._id}>
                <TableData>{c.name}</TableData>
                <TableData>
                  <EditButton
                    onClick={() => {
                      setVisible(true);
                      setUpdatedName(c.name);
                      setSelected(c);
                    }}
                  >
                    Edit
                  </EditButton>
                  <DeleteButton
                    onClick={() => {
                      handleDelete(c._id);
                      setSelected(c);
                    }}
                  >
                    Delete
                  </DeleteButton>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
      </Modal>
    </MainContainer>
  );
};

export default Category;

// Styled Components
const MainContainer = styled.main`
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CategoryFormContainer = styled.div`
  margin-bottom: 40px;
`;

const TableContainer = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;
