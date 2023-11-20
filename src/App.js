import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

export default function App() {
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1);
  const postparpage = 10;

  useEffect(() => {
    const fetchDAta = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/comments");
      const res = await data.json();
      setPost(res);
    };
    fetchDAta();
  }, []);

  const lastPost = number * postparpage;
  const firstPost = lastPost - postparpage;
  const currentPost = post.slice(firstPost, lastPost);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(post.length / postparpage); i++) {
    pageNumber.push(i);
  }
  console.log(pageNumber);
  const ChangePage = (selected) => {
    setNumber(selected);
  };
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentPost.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.body}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="my-3 text-center">
              <Button onClick={() => setNumber(number - 1)}>Previous</Button>{" "}
              {pageNumber.map((ele) => {
                return (
                  <>
                    <Button onClick={() => ChangePage(ele)}>{ele}</Button>{" "}
                  </>
                );
              })}
              <Button onClick={() => setNumber(number + 1)}>Next</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
