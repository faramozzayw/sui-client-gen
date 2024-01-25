import {
  PhantomReified,
  Reified,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { String } from '../ascii/structs'
import { bcs, fromB64 } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== TypeName =============================== */

export function isTypeName(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x1::type_name::TypeName'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TypeNameFields {
  name: ToField<String>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TypeName {
  static readonly $typeName = '0x1::type_name::TypeName'
  static readonly $numTypeParams = 0

  readonly $typeName = TypeName.$typeName

  readonly $fullTypeName: '0x1::type_name::TypeName'

  readonly name: ToField<String>

  private constructor(fields: TypeNameFields) {
    this.$fullTypeName = TypeName.$typeName

    this.name = fields.name
  }

  static reified(): Reified<TypeName, TypeNameFields> {
    return {
      typeName: TypeName.$typeName,
      fullTypeName: composeSuiType(TypeName.$typeName, ...[]) as '0x1::type_name::TypeName',
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => TypeName.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TypeName.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TypeName.fromBcs(data),
      bcs: TypeName.bcs,
      fromJSONField: (field: any) => TypeName.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TypeName.fromJSON(json),
      fetch: async (client: SuiClient, id: string) => TypeName.fetch(client, id),
      new: (fields: TypeNameFields) => {
        return new TypeName(fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TypeName.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TypeName>> {
    return phantom(TypeName.reified())
  }
  static get p() {
    return TypeName.phantom()
  }

  static get bcs() {
    return bcs.struct('TypeName', {
      name: String.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): TypeName {
    return TypeName.reified().new({ name: decodeFromFields(String.reified(), fields.name) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TypeName {
    if (!isTypeName(item.type)) {
      throw new Error('not a TypeName type')
    }

    return TypeName.reified().new({
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
    })
  }

  static fromBcs(data: Uint8Array): TypeName {
    return TypeName.fromFields(TypeName.bcs.parse(data))
  }

  toJSONField() {
    return {
      name: this.name,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TypeName {
    return TypeName.reified().new({ name: decodeFromJSONField(String.reified(), field.name) })
  }

  static fromJSON(json: Record<string, any>): TypeName {
    if (json.$typeName !== TypeName.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TypeName.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TypeName {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTypeName(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TypeName object`)
    }
    return TypeName.fromFieldsWithTypes(content)
  }

  static async fetch(client: SuiClient, id: string): Promise<TypeName> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TypeName object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTypeName(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TypeName object`)
    }
    return TypeName.fromBcs(fromB64(res.data.bcs.bcsBytes))
  }
}
