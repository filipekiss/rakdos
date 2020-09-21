export function getEnvironmentVar<DefaultReturnType>(
    name: string,
    defaultValue: DefaultReturnType | null = null,
): string | DefaultReturnType {
    const environmentValue = process.env[name];
    if (!environmentValue && !defaultValue) {
        throw new Error(`The environment variable ${name} must be set`);
    }
    return !!environmentValue
        ? environmentValue
        : (defaultValue as DefaultReturnType);
}

export const RAKDOS_TOKEN = getEnvironmentVar('RAKDOS_TOKEN');
export const SERVER_PORT = getEnvironmentVar('RAKDOS_PORT', '3000');
