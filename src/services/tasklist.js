import { db } from "../../firebase";
import { addDoc, collection,  deleteDoc,  doc,  getDoc,  getDocs, serverTimestamp, updateDoc, } from "firebase/firestore";


export const createTaskList = async (taskList) => {
  try {
    const taskListsRef = collection(db, "taskLists");
    const newList = await addDoc(taskListsRef, {
      title: taskList.title,
      description: taskList.description || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log("Task list created with ID:", newList.id);
    return newList.id;
  } catch (error) {
    console.error("Error creating task list:", error.message);
    throw new Error("Failed to create task list.");
  }
};



export const addTaskToList = async (taskListId, newTask) => {
  try {
    const taskRef = collection(db, "taskLists", taskListId, "tasks");

    const docRef = await addDoc(taskRef, {
      title: newTask.title,
      description: newTask.description || "",
      status: newTask.status || "pending",
      priority: newTask.priority || "low",
      dueDate: newTask.dueDate,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Fetch the newly created document
    const createdDocSnap = await getDoc(docRef);

    if (createdDocSnap.exists()) {
      return {
        id: docRef.id,
        ...createdDocSnap.data()
      };
    } else {
      throw new Error("Failed to fetch created task.");
    }
  } catch (error) {
    console.error("Error adding task to list:", error.message);
    throw new Error("Failed to add task.");
  }
};



export const getAllTaskListsWithTasks = async () => {
  try {
    const taskListsRef = collection(db, "taskLists");
    const taskListsSnap = await getDocs(taskListsRef);

    const taskLists = await Promise.all(
      taskListsSnap.docs.map(async (docSnap) => {
        const taskListId = docSnap.id;
        const taskListData = docSnap.data();

        // Fetch tasks from the subcollection
        const tasksRef = collection(db, "taskLists", taskListId, "tasks");
        const tasksSnap = await getDocs(tasksRef);

        const tasks = tasksSnap.docs.map((taskDoc) => ({
          id: taskDoc.id,
          ...taskDoc.data(),
        }));

        return {
          id: taskListId,
          ...taskListData,
          tasks,
        };
      })
    );

    return taskLists;
  } catch (error) {
    console.error("Error fetching task lists with tasks:", error.message);
    throw new Error("Failed to load task lists with tasks.");
  }
};


export const updateTaskStatus = async (taskListId, taskId, newStatus) => {
  try {
    const taskRef = doc(db, "taskLists", taskListId, "tasks", taskId);

    await updateDoc(taskRef, {
      ...newStatus,
      updatedAt: serverTimestamp()
    });

    console.log(`Task ${taskId} in list ${taskListId} updated to '${newStatus}'`);
  } catch (error) {
    console.error("Error updating task status:", error.message);
    throw new Error("Failed to update task status.");
  }
};

export const deleteTask = async (taskListId, taskId) => {
  try {
    const taskRef = doc(db, "taskLists", taskListId, "tasks", taskId);
    await deleteDoc(taskRef);
    console.log(`Task ${taskId} deleted from task list ${taskListId}`);
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return { success: false, message: error.message };
  }
};