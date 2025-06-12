/*
 *
 * https://github.com/typestack/class-validator/issues/633
 *
 */

import { getMetadataStorage, registerDecorator } from 'class-validator';

export function InheritParentDecorators() {
  return (target: any, propertyKey: string) => {
    const storage = getMetadataStorage();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const parent = Object.getPrototypeOf(target.constructor);

    if (!parent) {
      return;
    }

    const targetMetadatas = storage.getTargetValidationMetadatas(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      parent,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
      parent.name,
      false,
      false,
    );

    targetMetadatas
      .filter((e) => e.propertyName === propertyKey)
      .forEach((e) => {
        registerDecorator({
          name: e.type,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          target: target.constructor,
          propertyName: e.propertyName,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          options: { ...e.validationTypeOptions, message: e.message },
          constraints: e.constraints,
          validator: e.constraintCls,
        });
      });
  };
}
