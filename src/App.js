
import  {TodoContextProvider}  from "./contexts/todoContext";
import Header from "./components/Header/Header";
import Layout from "./components/Container/Layout";
import AddToDo from "./components/addToDo/AddToDo";
import ToDoList from "./components/toDoList/ToDoList";
import Footer from "./components/Footer/Footer";
function App() {
  return (
   <TodoContextProvider>
      <main className="main">
        <Layout>
          <Header/>
          <AddToDo/>
          <ToDoList/>
          <Footer/>
        </Layout> 
      </main>
   </TodoContextProvider>
  );
}

export default App;
