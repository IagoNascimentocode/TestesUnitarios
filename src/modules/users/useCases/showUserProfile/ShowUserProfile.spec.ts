import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "../showUserProfile/ShowUserProfileUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";


let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User", () => {

 beforeEach(async () => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);

 })

 it("Should be able show User", async () => {

  const user = await createUserUseCase.execute({
   name: "New User",
   email: "test@test.com",
   password: "12345"
  });


  const response = await showUserProfileUseCase.execute(user.id!);

  expect(response).toHaveProperty("email");
  expect(response.name).toBe(user.name);
 });
});