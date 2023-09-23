import { DataSource } from 'typeorm';
import { configuration } from './db.config';

const dataSourceConfig = configuration.getDataSourceConfig();
export const dataSource = new DataSource(dataSourceConfig);
