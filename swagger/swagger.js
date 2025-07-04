import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(process.cwd(), 'docs/swagger.yaml'));

export default swaggerDocument;