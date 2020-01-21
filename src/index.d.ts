export type CrExOptions = {
	user?: string,
	password?: string,
	url?: string
	port?: string,
	proxy?: any
}

export type CrExPackage = {
	packageId: string,
	rootPath: string,
	name: string,
	lastModified: string,
	lastModifiedBy: string,
	created: string,
	createdBy: string,
	status: string,
};

export type CrExArgPackage = {
	packageId: string
};

export type CrExArgAllPackage = {
	page: number
	perPage: number
};

export type CrExArgNewPackage = {
	rootPath: string,
	name?: string
};

export type CrExArgBuildPackage = {
	packageId: string,
	synchronous?: boolean,
};

export type CrExArgUploadPackage = {
	file: ReadableStream<any>
};

export type CrExResponse = Promise<CrExPackage>;

interface CrExRequestOptions {
	user: string;
	password: string;
	proxy?: any
}

interface CrExRequestArgs {
	packageId?: string;
	rootPath?: string;
	name?: string;
	synchronous?: boolean;
	file?: ReadableStream<any>
}
