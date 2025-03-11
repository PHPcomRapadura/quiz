import UserConfigRepository from "../../Domain/Admin/UserConfigRepository";
import { Content, Data, Id, Status } from '../../Domain/Contracts.ts'
import InMemoryRepository from '../Driver/InMemory/InMemoryRepository.ts'

export default class InMemoryUserConfigRepository extends InMemoryRepository implements UserConfigRepository {
  update (id: Id, data: Data): Promise<Content> {
    return this.promisify({ status: Status.success, data: { id, config: data } })
  }
}
