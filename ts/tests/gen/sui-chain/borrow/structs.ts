import {
  ReifiedTypeArgument,
  ToField,
  ToTypeArgument,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  decodeFromFieldsGenericOrSpecial,
  decodeFromFieldsWithTypesGenericOrSpecial,
  extractType,
  toBcs,
} from '../../_framework/types'
import { FieldsWithTypes, compressSuiType, genericToJSON } from '../../_framework/util'
import { Option } from '../../move-stdlib-chain/option/structs'
import { ID } from '../object/structs'
import { BcsType, bcs, fromHEX, toHEX } from '@mysten/bcs'

/* ============================== Referent =============================== */

export function isReferent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::borrow::Referent<')
}

export interface ReferentFields<T0 extends TypeArgument> {
  id: ToField<'address'>
  value: ToField<Option<T0>>
}

export class Referent<T0 extends TypeArgument> {
  static readonly $typeName = '0x2::borrow::Referent'
  static readonly $numTypeParams = 1

  readonly $typeName = Referent.$typeName

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`Referent<${T0.name}>`, {
        id: bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
        value: Option.bcs(T0),
      })
  }

  readonly $typeArg: string

  readonly id: ToField<'address'>
  readonly value: ToField<Option<T0>>

  private constructor(typeArg: string, fields: ReferentFields<T0>) {
    this.$typeArg = typeArg

    this.id = fields.id
    this.value = fields.value
  }

  static new<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    fields: ReferentFields<ToTypeArgument<T0>>
  ): Referent<ToTypeArgument<T0>> {
    return new Referent(extractType(typeArg), fields)
  }

  static reified<T0 extends ReifiedTypeArgument>(T0: T0) {
    return {
      typeName: Referent.$typeName,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Referent.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Referent.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Referent.fromBcs(T0, data),
      bcs: Referent.bcs(toBcs(T0)),
      __class: null as unknown as ReturnType<typeof Referent.new<ToTypeArgument<T0>>>,
    }
  }

  static fromFields<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    fields: Record<string, any>
  ): Referent<ToTypeArgument<T0>> {
    return Referent.new(typeArg, {
      id: decodeFromFieldsGenericOrSpecial('address', fields.id),
      value: decodeFromFieldsGenericOrSpecial(Option.reified(typeArg), fields.value),
    })
  }

  static fromFieldsWithTypes<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Referent<ToTypeArgument<T0>> {
    if (!isReferent(item.type)) {
      throw new Error('not a Referent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Referent.new(typeArg, {
      id: decodeFromFieldsWithTypesGenericOrSpecial('address', item.fields.id),
      value: decodeFromFieldsWithTypesGenericOrSpecial(Option.reified(typeArg), item.fields.value),
    })
  }

  static fromBcs<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    data: Uint8Array
  ): Referent<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return Referent.fromFields(typeArg, Referent.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSON() {
    return {
      $typeArg: this.$typeArg,
      id: this.id,
      value: genericToJSON(`0x1::option::Option<${this.$typeArg}>`, this.value),
    }
  }
}

/* ============================== Borrow =============================== */

export function isBorrow(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x2::borrow::Borrow'
}

export interface BorrowFields {
  ref: ToField<'address'>
  obj: ToField<ID>
}

export class Borrow {
  static readonly $typeName = '0x2::borrow::Borrow'
  static readonly $numTypeParams = 0

  readonly $typeName = Borrow.$typeName

  static get bcs() {
    return bcs.struct('Borrow', {
      ref: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      obj: ID.bcs,
    })
  }

  readonly ref: ToField<'address'>
  readonly obj: ToField<ID>

  private constructor(fields: BorrowFields) {
    this.ref = fields.ref
    this.obj = fields.obj
  }

  static new(fields: BorrowFields): Borrow {
    return new Borrow(fields)
  }

  static reified() {
    return {
      typeName: Borrow.$typeName,
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Borrow.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Borrow.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Borrow.fromBcs(data),
      bcs: Borrow.bcs,
      __class: null as unknown as ReturnType<typeof Borrow.new>,
    }
  }

  static fromFields(fields: Record<string, any>): Borrow {
    return Borrow.new({
      ref: decodeFromFieldsGenericOrSpecial('address', fields.ref),
      obj: decodeFromFieldsGenericOrSpecial(ID.reified(), fields.obj),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Borrow {
    if (!isBorrow(item.type)) {
      throw new Error('not a Borrow type')
    }

    return Borrow.new({
      ref: decodeFromFieldsWithTypesGenericOrSpecial('address', item.fields.ref),
      obj: decodeFromFieldsWithTypesGenericOrSpecial(ID.reified(), item.fields.obj),
    })
  }

  static fromBcs(data: Uint8Array): Borrow {
    return Borrow.fromFields(Borrow.bcs.parse(data))
  }

  toJSON() {
    return {
      ref: this.ref,
      obj: this.obj,
    }
  }
}