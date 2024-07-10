import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@repo/shared-api';
import { SettingsService } from './setting.service';
import { Controller } from '@nestjs/common';


@Controller()
export class MyController {
  constructor(private readonly setting: SettingsService) { }

  @TsRestHandler(contract.setting)
  async handler() {
    return tsRestHandler(contract.setting, {
      get: async () => {
        return {
          status: 200,
          body: this.setting.get()
        }
      },
      post: async ({ body }) => {
        return {
          status: 200,
          body: this.setting.update(body)
        }
      }
    });
  }
}