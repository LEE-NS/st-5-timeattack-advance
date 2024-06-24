import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../api/todos";
import { useQuery } from "@tanstack/react-query";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: useQuery 로 리팩터링 하세요.

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchDetail,
  });

  const fetchDetail = async () => {
    try {
      const response = await todoApi(`/todos/${id}`);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (isError) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {todos.title}</p>
      <p>내용: {todos.contents}</p>
      <p>작성일자: {new Date(todos.createdAt).toDateString()}</p>
    </div>
  );
}
