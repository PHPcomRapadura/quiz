import { Content, Data, Id } from '../Contracts.ts'

export default interface UserConfigRepository {
  update (id: Id, data: Data): Promise<Content>
}
